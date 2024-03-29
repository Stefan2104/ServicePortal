// get caller information
var userUtils = new ArlaUserUtils();
var userObj = userUtils.getUser(gs.getUserID());
var caller_name = userObj.fullName;
arla_assign();

// If user != caller, Description += UserID. Else, += Initials
var caller;
if (producer.sap_user == 'No') {
	caller = 'UserID: ' + producer.user;
}else {
	caller = 'Initials: ' + userObj.userName;
}


// Set Ticket- type and state, Business Service and Target Architecture 
current.caller_id = gs.getUserID();
current.contact_type = 'service portal';
current.u_incident_type = 1;
current.u_business_service = '7e987fe8db6bf2006ee5fb041d9619d6';
current.u_it_service = '380d73a4dbabf2006ee5fb041d961945';
current.incident_state = 5;

// Set Urgency
if (producer.users_affect == 'single') {
	current.urgency = 4;
}else {
	current.urgency = 3;
}
// Set impact
if (producer.impact == '1') {
	current.impact = 3;
}else {
	current.impact = 4;
}

// ####  Set description

if (producer.sap_sys == 'C4C') {                                       
	// If SAP is C4C, define all settings
	crm_assign();     // Assign to IBM-CRM
	var desc_ext = 'System: ' + producer.sap_sys;
	current.short_description = 'SAP ' + producer.sap_sys + 
	' - ' + producer.sap_prob;
	
}else {
	// Set Incident information; Short Description and Description
	desc_ext = 'System: ' + producer.sap_system + ' ' + producer.sap_client +
	'\n' +'Transaction code: '+ producer.sap_trans;
	current.short_description = 'SAP ' + producer.sap_system + 
	' - ' + producer.sap_trans + 
	' - ' + producer.sap_prob;
}

    // Default description, takes info from desc_ext according to C4C or SAP Logon system chosen 
var desc_text = 'Caller: ' +caller_name + 
	'\n' + caller +
	'\n' +'Email: ' + userObj.email +
	'\n' +'Phone: ' +userObj.phone + 
	'\n' + desc_ext +
	'\n' +'Issue: ' + producer.problem_description;
	
    // If input in additional comment, add to Description

if (producer.comment != '') {
	desc_text += '\n' +'Additional comments: ' + producer.comment;
}else if (producer.sap_relation == 'batch') {
	desc_text += '\n' + 'Comments: ' + producer.batch_topic;
}else if (producer.sap_relation != 'other') {
	desc_text += '\n' + 'Comments: ' + producer.sap_relation + ' related';
}
     // If Order number chosen, display the order number in Description. Otherwise, hide
if (producer.sapnumber != 'None') {
	desc_text = desc_text + '\n' + producer.sapnumber + 
	': ' + producer.order_number;
} 

    // Set description text
current.description = desc_text;


// ####  Reassignment 
	// Define IBM teams transaction codes
var sal_trans     = ["VA01", "VA02", "VA03", "VL01N", "VL02N" , "VL03N", "VFO1", "VF02", "VF03", "VT01N", "VT02N", "VT03N", "VI01", "VI02", "VI03", "ZCNOSE_VK11", "ZPGS_CNO_ALLOCATION", "ZSDUK_REBATE", "ZSDUK_INVOICE_PRINT", "ZSDUK_BILLING", "ZMAC_SALE", "ZMAC_SALE_NEW", "ZMAC_SALE_RMS", "ZSD_SET_REJECTION", "ZSD1_NUMB_RANGE", "ZSD1_SALES_PRINT", "ZERCREDIT", "ZERCREDIT1"];
var prod_trans    = ["COR3", "CO54", "CO60", "C202", "C203", "CO53", "C223", "CS03", "CR03", "ZPMY_ORDERADMIN"];
var pur_trans     = ["MMBE", "ME21N", "ME22N", "ME23N", "ZPMY_INV_BALN", "MB52", "MB51"];
var pm_trans      = ["IW31", "IW38", "IW21", "IW28", "IW27", "IW39","IW37","ZMCI3","ZMCI8","CR05"];
var qm_trans      = ["QA32", "QA01", "QP01", "QP02", "QE51N", "ZPPP_SPEC3", "ZPPP_SPEC1_ALL", "ZPPP_ZQ02", "ZPPP_ZQ02_WMS"];
var wd_trans      = ["ZPCS_LX03", "VLMOVE", "ZWM_BIN2BIN", "ZWMUK_HAPY_COUNT", "ZWM_GOODS_IN", "LI20", "LI21", "LT*", "LS*", "ZPCS_LM02N", "ZPCS_LT13"];
var ft_trans      = ["FTR_EDIT", "FTR_CREATE", "PCA", "OKB9", "IHC", "KE5Z", "COPA"];


	// Loop to sap_relation; what area is it related to?
if  (producer.sap_relation == "Sales (& shipments/transport)") {
	sal_assign(); 
}else if (producer.sap_relation == "Production"){
	prod_assign();
}else if (producer.sap_relation == "Purchase") {
	pur_assign();
}else if (producer.sap_relation == "batch") {
	batch_assign();
}else if (producer.sap_relation == "Finance") {
	ft_assign();
}else if (producer.sap_relation == "Planning and Forecast") {
	pf_assign();
}else if (producer.sap_relation == "Business Intelligence") {
	artbi_assign();
}else if (producer.sap_relation == "Warehouse & Distribution") {
	wd_assign();
}


	// Loop through input' tcode and assigns
for (var i=0; i < sal_trans.length; i++) {
	if (producer.sap_trans == sal_trans[i] ||producer.sap_trans == sal_trans[i].toLowerCase() ) {
		sal_assign();    // Assign to IBM-SAL
		break;
	}else if (producer.sap_trans == prod_trans[i] ||producer.sap_trans == prod_trans[i].toLowerCase()) {
		prod_assign();   // Assign to IBM-Production
		break;
	}else if (producer.sap_trans == pur_trans[i] ||producer.sap_trans == pur_trans[i].toLowerCase() ) {
		pur_assign();    // Assign to IBM-PUR;
		break;
	}else if (producer.sap_trans == pm_trans[i] ||producer.sap_trans == pm_trans[i].toLowerCase() ) {
		pm_assign();     // Assign to IBM-PM
		break;
	}else if (producer.sap_trans == qm_trans[i] ||producer.sap_trans == qm_trans[i].toLowerCase() ) {
		qm_assign();     // Assign to IBM-QM
		break;
	}else if (producer.sap_trans == wd_trans[i] || producer.sap_trans == wd_trans[i].tolowerCase()) {
		wd_assign();     // Assign to IBM-W&D
		break;
	}else if (producer.sap_trans == ft_trans[i] ||producer.sap_trans == ft_trans[i].toLowerCase()) {
		ft_assign();     // Assign to IBM-F&T
	}
}
// If concerning specific properties in relation to IBM keywords guice
if (/^(QX5|PX5|DX5)/i.test(producer.sap_system) || current.short_description.toLowerCase().includes('invoice') & current.short_description.toLowerCase().includes('reject')) {
	edi_assign();     // Assign to IBM-EDI  if QX5/PX5/DX5 or short_description contains "invoice" and "reject" (keyword guide slide 17)
}else if (producer.sap_system == 'PA1' || producer.sap_system == 'PS1' & current.short_description.toLowerCase().includes('order') & current.short_description.toLowerCase().includes('stuck')) {
	pf_assign();      // Assign to IBM-P&F if PA1
}else if(/^(ZWM|LS|LT)/i.test(producer.sap_trans) & producer.sap_system == 'PS1'|| producer.sap_system == 'PS1' & producer.sapnumber == 'Transfer Order number'){
	wd_assign();      // Assign to IBM-W&D if tcode starts with ZWM/LS/LT, or if PS1 and regarding Transfer Order
}else if (/^(ZMAC)/i.test(producer.sap_trans) & producer.sap_system == 'PS1' & /^(ZMAC_SALE)/i.test(producer.sap_trans) == false){
	current.assignment_group.setDisplayValue("IBM-MAC");    // Assign to IBM-PUR if tcode starts with ZMAC, 
}else if (/^(ZFIT|IHC)/i.test(producer.sap_trans) & producer.sap_system == 'PS1'){
	ft_assign();
}
if (producer.sap_system == 'PWU' || producer.sap_system == 'PWT'){
	ewm_assign();
}else if (producer.sap_system == 'PB7' || producer.sap_system == 'PB2'){
	artbi_assign();
}else if (producer.sap_system == 'PT1'){
	tm_assign();
}else if (producer.sap_relation == 'Slow Performance' || current.short_description.toLowerCase().includes('slow','performance') || current.description.toLowerCase().includes('slow','performance')){
	tek_assign();
}else if (producer.printer == 'Yes') {
	tek_assign();
}if (producer.sap_sys == 'C4C') {                                       
	crm_assign();     // Assign to IBM-CRM	
}

function sal_assign() {
	current.assignment_group.setDisplayValue("IBM-SAL");
}function prod_assign() {
	current.assignment_group.setDisplayValue("IBM-Production");
}function pur_assign() {
	current.assignment_group.setDisplayValue("IBM-PUR");
}function pm_assign() {
	current.assignment_group.setDisplayValue("IBM-PM");
}function qm_assign() {
	current.assignment_group.setDisplayValue("IBM-QM"); 
}function wd_assign() {
	current.assignment_group.setDisplayValue("IBM-W&D");
}function pf_assign(){
	current.assignment_group.setDisplayValue("IBM-P&F");
}function artbi_assign(){
	current.assignment_group.setDisplayValue("IBM-ART-BI");
}function ft_assign(){
	current.assignment_group.setDisplayValue("IBM-F&T");
}function batch_assign(){
	current.assignment_group.setDisplayValue("NNIT-Batch");
}function edi_assign(){
	current.assignment_group.setDisplayValue("IBM-EDI");
}function tm_assign(){
	current.assignment_group.setDisplayValue("IBM-TM");
}function tek_assign(){
	current.assignment_group.setDisplayValue("NNIT-SAPTek-OSD");
}function ewm_assign(){
	current.assignment_group.setDisplayValue("IBM-EWM");
}function arla_assign(){
	current.assignment_group.setDisplayValue("Arla-ITServiceDesk");
}function crm_assign(){
	current.assignment_group.setDisplayValue("IBM-CRM");
}

