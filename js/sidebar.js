var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOSIsImp0aSI6IjRhZmUxMjljLTFhNzMtNDFhNi04ZTNmLWMyZDdmOGEzNzA0NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDkxMjc5NzYxOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsicHVibGljIiwiYWRtaW5UaWNrZXQiXSwiZXhwIjoxNjg5NjIyMTA0LCJpc3MiOiJNS0giLCJhdWQiOiJNS0gifQ.ORsG3gSNLF82qOaeIa_SRo9LyqwWvSGG4YpudrintcU';
kh_main.service.get("userTicket/Tickets", function (response) {

    kh_main.Loding.hide();
    if (response.messageType == 1) {
        var data = response.objectResult;
        for (let index = 0; index < data.length; index++) {
            const item = data[index];

            var row = $('.contacts .temprow .users').clone();
            $('h3' , row).html(item.subject);

            $('.contacts').append(row);
        }
    }
    else {
        console.log(response);
        alert(response.message);
    }

},token);


function  GetChats(status){
    var link = 'userTicket/Tickets?status='+status ;
    kh_main.service.get(link, function (response) {

        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.contacts .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html('14t');
                $('.contacts').append(row);
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}

function  GetMessage(tag){
    var id = $(tag).attr('data-id');
    var link = 'userTicket/Chats?chatinfo='+id ;
        kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                //if(item.senderid = kh_main.cookie.getvalue('userid')){
                if(item.senderid == '29'){
                    var row = $('.chat .temprow .message-right').clone();
                    if(item.answer_id == NULL){
                       $('.reply',row).remove();
                    }
                    else{
                        $('.reply span' , row).html(item.answercontent);
                        $('.reply span' , row).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row).html(item.content);
                    $('.main-content' , row).attr('data-id',item.id);
                }

                //if(item.senderid != kh_main.cookie.getvalue('userid')){
                if(item.senderid == '29'){
                    var row = $('.chat .temprow .message-left').clone();
                    if(item.answer_id == NULL){
                       $('.reply',row).remove();
                    }
                    else{
                        $('.reply span' , row).html(item.answercontent);
                        $('.reply span' , row).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row).html(item.content);
                    $('.main-content' , row).attr('data-id',item.id);
                }

            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}