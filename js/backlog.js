$(function() {
	Backlog.init();
});

Backlog = {
    updateUrl: "test.json",
    projectReceived: 0,
    init: function(){
        $('.sortable').sortable({
            connectWith: '.sortable',
            receive: function(event, ui){
                Backlog.projectReceive($(ui.item), $(ui.sender), sanitizeSortableArray("project", $(this).sortable('serialize')));
                Backlog.projectReceived = true;//keep from repeating if changed lists
            },
            stop: function(event, ui){
                if(Backlog.projectReceived !== true){
                    Backlog.sameReceive($(ui.item), sanitizeSortableArray("project", $(this).sortable('serialize')));
                }
                else{
                    Backlog.projectReceived = false;
                }
            }
        }).disableSelection();
    },
    projectReceive: function(item, sender, receiverSerialized){
        itemId = cleanId("project", $(item).attr("id"));
        receiverId = cleanId("sprint", $(item).parent().attr("data-list-id"));
        senderId = $(sender).attr("data-list-id");
        if(typeof($(sender).attr("data-list-id") !== "undefined")){
            var senderSerialized = sanitizeSortableArray("project", $(sender).sortable('serialize'));
            
            data = {
                itemId: itemId,
                sender: [senderId, senderSerialized],
                reciever: [receiverId, receiverSerialized]
            }
            
            Backlog.ajaxUpdateBacklog(data);
        }
    },
    sameReceive: function(item, receiverSerialized){
        itemId = cleanId("project", $(item).attr("id"));
        receiverId = cleanId("sprint", $(item).parent().attr("data-list-id"));
       
        data = {
             itemId: itemId,
             reciever: [receiverId, receiverSerialized]
         }
         
         Backlog.ajaxUpdateBacklog(data);       
    },
    ajaxUpdateBacklog: function(data){
        projectId = data.itemId;
        Backlog.block(projectId);
        /*$.ajax({
          type: "POST",
          url: Backlog.updateURL,
          data: data,
          success: function(data, textStatus, jqXHR){
                Backlog.unBlock(projectId);
          },
          error: function(jqXHR, textStatus, errorThrown){
                Backlog.unBlock(projectId);
                console.log("ERROR");
          }		  
        });*/
    },
    block:function(projectId){
        var project = $('#project_'+projectId);
        project.append('<div class="spinner"></div>');
    },
    unBlock:function(projectId){
        var project = $('#project_'+projectId);
        project.find('.spinner').remove();
    },
}


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
        return false;
    } else {
        return true;
    }
}

function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    } else {
        return true;
    }
}

jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};

function cleanId(identifier, id){
    return(id.replace(identifier+"_", id));
}

function sanitizeSortableArray(identifier, sortableString){
    sortableString = sortableString.replace(/&/g, "");
    
    sortableArray = new Array();
    sortableArray = sortableString.split(identifier+"[]=");
    sortableArray.splice(0,1);
    
    return(sortableArray);
}