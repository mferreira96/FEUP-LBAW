
function createWarningBox(){

	var e = $(document.createElement('div'));
	e.addClass('box-alerts');
	$('body').append(e);

}

function addWarning(type, msg){
	
	var e = $(document.createElement('div'));
  var alertType = 'alert alert-';
	alertType += type;	
	e.addClass(alertType);
	type = type.charAt(0).toUpperCase() + type.slice(1);
	var message = '<strong>'+ type  +'</strong>'+ msg;
	e.append(message);
	$('.box-alerts').append(e); 
	setTimeout(function() {
		e.remove();
	}, 2000);
}

function addUser(username){
	var element = $('.template tr').clone(true);

	//console.log(element.html());
	//console.log($('.template tr').html());

	element.find('.template_name').html(username);
	element.find('.link_removeUser').attr('username',username);
	$('#project-users tbody').append(element);

}

function addShow(index){
  var target = $(this).attr("target");

  $(this).click(function(){
    toggleSideBar(target);
  });
}

function toggleSideBar(target){
  if($(window).width()  < 768)
    $('.show').each(function(index){
      if($(this)[0].id != target)
        $(this).removeClass('show');
    });
  $("#"+target).toggleClass("show");
}

function toggler_addListener(){
  var togglers = $('.toggler');
  $('.toggler').click(function(){
    togglers.each(function(i){
      $(this).parent().removeClass('active');
    });
    $(this).parent().addClass('active');
  });

}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param].replace("#","") : null;
	}
	return vars.replace("#","");
}

function remove_document(){

	$('.link_deleteDocument').click(function() {

			var documentId= $(this).attr('id');

			var success;
			$.ajax({
				type: "POST",
				url: "../../actions/project/action_delete_document.php",
				data: {project_id: $_GET('project_id'), document_id: documentId}
			});

			$(this).parent().remove();
	});

}

function remove_project(){

	$('.link_deleteProject').click(function() {
        var projectId= $('.link_deleteProject').parent().find('.project_id').val();
        handleRemoveProject(projectId,true, "Project deleted",$(this));
        }
	);

    $('.link_deleteCollaboration').click(function() {
        var projectId= $('.link_deleteCollaboration').parent().find('.project_id').val();
        handleRemoveProject(projectId,false, "Collaboration deleted",$(this));
    });
}

function handleRemoveProject(projectId, is_owner,message,context) {

    $.ajax({
        type: "POST",
        url: "../../actions/profile/action_delete_project.php",
        data: {project_id: projectId, isOwner: is_owner}
    }).done(function(arg){
        var obj = JSON.parse(arg);
		console.log(obj);
        if(obj.success) {
            addWarning("success", message);
            context.parent().parent().parent().remove();
        }else{
            addWarning("warning", message);
		}
    });
}





function remove_user(){
	$('.link_removeUser').click(function() {
			var username = $(this).attr('username');
			$.ajax({
				type: "POST",
				url: "../../actions/project/action_remove_user.php",
				data: { username: username, project_id: $_GET('project_id')}
			}).done(function(arg){	
				addWarning('success','User Deleted!');
			}).fail(function(){
				addWarning('warning','User NOT Found!');
			});

			$(this).parent().parent().remove();
	});
}

function get_task_information(){

	$('.btn_edit_task').click(function() {
		var task_id = $(this).attr('task_id');		
		$.ajax({
            		type: "post",
            		dataType: "json",
            		url: '../../api/get_task_info.php',
            		data: {'task_id' : task_id}
		}).done(function(arg){
			$('.task_description').html(arg['description']);
			$('.task_deadline').attr('value', arg['deadline']);
			$('.task_category').attr('value', arg['category']);
		}).fail(function(arg){
			console.log("Error = " + arg);
		});		
	
	});
}


function delete_notification(){

	$('.btn_delete_notification').click(function() {
		var notification_id = $(this).attr('notification_id'); 
		var toDelete = $('.notification-item[notification_id="'+notification_id+'"');
		var bell = $('.badge.badge-notify');
		bell.html(Number(bell.html())-1);
		toDelete.css("visibility",'hidden');
		toDelete.css("position",'fixed');
		$.ajax({
            		type: "POST",
            		url: "../../actions/profile///action_delete_notification.php",
			data: { 'notification_id': notification_id}
		}).done(function(){
			addWarning('success','Notification deleted!');
			toDelete.remove();
		}).fail(function(){
			bell.html(Number(bell.html())+1);
			toDelete.css('visibility','visible');
			toDelete.css("position",'relative');
			addWarning('warning','Problem deleting notification');
		});		
	
	});
}

function delete_all_notifications(){

	$('.btn_delete_all_notifications').click(function() {		
		var toDelete = $('.notification-item');
		var bell = $('.badge.badge-notify');
		var oldValue = bell.html();
		toDelete.css("visibility",'hidden');
		toDelete.css("position",'fixed');
		bell.html("0");
		$.ajax({
            		type: "POST",
            		url: "../../actions/profile/action_delete_all_notifications.php"
		}).done(function(){
			addWarning('success','All notifications deleted!');
			toDelete.remove();
		}).fail(function(){
			bell.html(oldValue);
			toDelete.css('visibility','visible');
			toDelete.css("position",'relative');
			addWarning('warning','Problem deleting all notifications');
		});		
	
	});
}


function get_project_information(){

	$('.btn_project_edit').click(function() {
		var id = $(this).attr('project_id');
		$('.hidden_projectId').attr('value',id);
		
		$.ajax({
            		type: "post",
            		dataType: "json",
            		url: '../../api/get_project_info.php',
            		data: {'project_id' : id}
		}).done(function(arg){
			console.log(arg);
			$('.project_folder').attr('value', arg['folder']['name']);
			$('.project_description').html(arg['description']);
			$('.project_deadline').attr('value', arg['deadline']);
		}).fail(function(arg){
			console.log(arg);
		});		
	
	});
}

function get_collaboration_information(){

    $('.btn_collaboration_edit').click(function() {
        var id = $(this).attr('collaboration_id');
        $('.hidden_collaboration_id').attr('value',id);

        $.ajax({
            type: "post",
            dataType: "json",
            url: '../../api/get_project_info.php',
            data: {'project_id' : id}
        }).done(function(arg){
            console.log(arg);
            $('.project_folder').attr('value', arg['folder']['name']);
        }).fail(function(arg){
            console.log(arg);
        });

    });
}



function add_user(){

	$('#form-addUser').keypress(function(e) {

		var elem = $(this);
		key = (e.keyCode)? e.keyCode : e.charCode;
		if( key == 13){
			elem.prev().click();
			return false;
		}
	});

    $('#form-addUser').prev().click(function() {

        var elem = $('#form-addUser');
		var username = elem.val();

		$.ajax({
			type: "POST",
			url: "../../actions/project/action_add_user.php",
			data: { username: username, project_id: $_GET('project_id')}
		}).done(function(arg){
			addWarning('success','User successfully added!');
			addUser(username);
			elem.val("");
		}).fail(function(){
			addWarning('warning','User NOT Found!');
		});
    });
}


function touch_addListener(){
  var touchPosition = {x:0,y:0};
  var calculate = false;
  var size = 20;
  document.addEventListener('touchstart',function(e){

    touchPosition.x = e.changedTouches[0].pageX;
    touchPosition.y = e.changedTouches[0].pageY;
    calculate = touchPosition.x < size || touchPosition.x > $(window).width() - size;
  }, false);
  document.addEventListener('touchend',function(e){
    if(!calculate)
      return;
    var diffx = e.changedTouches[0].pageX - touchPosition.x;
    var diffy = e.changedTouches[0].pageY - touchPosition.y;

    if(Math.atan2(Math.abs(diffy), Math.abs(diffx)) < Math.PI*15/180 && Math.abs(diffx) > 30){
      if(diffx < 0){
        toggleSideBar("sidebar-right");
      }else{
        toggleSideBar("sidebar-left");
      }
    }

  }, false);
}

function setupDatePickers(){
  $('.datetimepicker').attr('type', 'text');
  $(".datetimepicker").datetimepicker({
    format: 'DD/MM/YYYY'
  });
}

function openModals(){
  var get_vars = window.location.search.substring(1);
  var single_vars = get_vars.split('&');
  for (var i = 0; i < single_vars.length; i++)
  {
      var param_name = single_vars[i].split('=');
      if (param_name[0] == "action")
          $("#"+param_name[1]).modal('show');
  }
}


Dropzone.options.myDropzone = {
	
 	autoProcessQueue: false,
 	addRemoveLinks: true, 
	uploadMultiple: true,
	url: "../../actions/project/action_add_document.php",
	
	  init: function() {
    		var submitButton = document.querySelector("#submit-all");
       		myDropzone = this; 

	    	submitButton.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
     			myDropzone.processQueue(); 
	   	});
		
		this.on("processingmultiple", function(files) {  
			console.log("processing " +  files);
		});


		this.on("sendingmultiple", function(files, http, formData) {
       			 console.log('Sending files ');
			console.log(files);
			formData.append('project_id', $_GET('project_id'));
      		});

		this.on("successmultiple", function(files, response) {
      			console.log(response);
		});

		this.on("error", function(files, response) {
      			console.log("Error ");
			console.log(response);
		});

		this.on("queuecomplete", function(files) {
			console.log(this.files);
      			console.log("queue completed");
			
		});
	

 	 }

};




$(document).ready(function(){
  if($(".view").length > 0) $("body").addClass('view');

  setupTodoListeners();
  setupForumListeners();
  setupDatePickers();
  touch_addListener();
  toggler_addListener();
  openModals();
  add_user();
  remove_user();
  remove_project();
  remove_document();
  delete_notification();
  delete_all_notifications();
  get_project_information();
  get_collaboration_information();
  get_task_information();
  setTimeout(function(){
    $("body").removeClass("preload");
  },500);
	createWarningBox();
  $('.hide-actor').each(addShow);

});

