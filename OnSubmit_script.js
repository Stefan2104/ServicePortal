//Redirect: Skype login issue WORKING

function onSubmit() {
	if (g_form.getValue('issue') == 'login_issue') {
		spModal.open({
			message: "Login issues not solvable by the guide needs to be solved in call with IT Service Desk." +'<h4>' + '\n'+'Would you like to be redirected to the page with our number?',
			title: '<h3>Call IT Service Desk!<h3>',
			buttons: [ 
				{label:'✘ No', cancel: true},
				{label:'✔ Yes', primary: true}
			]
		}).then(function(){
			location.href="https://it.arlaintra.net/service-desk/Pages/default.aspx";
		});spModal.open({
			message: '<h5>Anyone with Skype login issues needs to try the guide' +'<h4>Please try it! Click [Yes] to download<h4>',
			title: 'Please try the guide!',
			buttons: [ 
				{label:'✘ No', cancel: true},
				{label:'✔ Yes', primary: true}
			]
		}).then(function(){			
			location.href="https://teamsites.arlaintra.net/sites/ITSD/Documents/Fix%20Skype%20Login%20Issue.pdf";
		});return false;
	}
}

// USE ABOVE FOR Skype Login issue - WORKING



	
	
	function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
	sd = g_form.getValue('issue');
	if (sd == 'meetings_issue'){
		var c = this;
		c.confirmed = "asking";
		spModal.alert("Please make sure to attach a screenshot!").then(function(confirmed) {
		c.confirmed = confirmed; // true or false
		if (c.confirmed == true) {
			g_form.setValue('triggerOnSubmit()', true);
		}else {
			g_form.setValue('triggerOnSubmit()', false);
		}
	});
	}
}

WORKIGN!!

function onSubmit() {
	if (typeof spModal != 'undefined') {
		spModal.open({
			widget: 'wd-kb-article-popup', 
			widgetInput: {'sys_id': '5c08911d37f4af40548b53b543990ec2'},
			title: 'SDS-China Submission',
			buttons: [ 
				{label:'✘ No', cancel: true},
                {label:'✔ Yes', primary: true}
			]
		}).then(function(){
			location.href="/sp?id=view_my_sds_tickets";
		});

	}return false;
	
	
	
	
	
	
	function onSubmit() {
	if (typeof spModal != 'undefined') {
		spModal.open({
			widget: 'wd-kb-article-popup', 
			widgetInput: {'sys_id': '01048c70db471bc0a5f2f7b31d961936'},
			title: '123Material Master Information to Orderflex',
			buttons: [ 
				{label:'✘ No', cancel: true},
                {label:'✔ Yes', primary: true}
			]
		}).then(function(){
			location.href="kb_knowledge_list.do?sysparm_clear_stack=true&sysparm_query=workflow_state%3Dpublished%5EEQ";
		});
	}return false;
	
}


WORKS GOOD

function onSubmit() {
	if (typeof spModal != 'undefined') {
		spModal.open({
			message: 'The PDF guide fixes almost every Skype issue.' + '\n' +'Please try it before you continue! Click [Yes] to download',
			title: '     Try our new, SIMPLE and bulletproof PDF guide!',
			buttons: [ 
				{label:'✘ No', cancel: true},
                {label:'✔ Yes', primary: true}
			]
		}).then(function(){
			location.href="https://teamsites.arlaintra.net/sites/stayconnected/Documents/Guide to Enroll a Samsung Android phone in Intune.pptx";
		},function() {
            c.agree = 'no';
			return false;
        });
	}
}
	
	
  