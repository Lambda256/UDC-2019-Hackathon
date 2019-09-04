
function loadProject(projectId) {

    $.get("http://localhost:8000/project/0").then(r => {
        
        $("#title").val(r.title)
        $("#goal").val(r.goal)
        $("#trooperCount").val(r.goal)
        
        if (r.isClosed != "0") {
            $("#isClosed").checkbox('check');        
        }        
    })

    $.get("http://localhost:8000/project/0/content").then(r => {

        console.log('rrr:', r[0]);

    })
}

/*
adminWs.on("callback", function(payload) {

    console.log("Callback Payload:", payload);

    if (payload.type == "getdevice") {

        let arrScreen = [];
        let arrAudio  = [];
        let arrCam    = [];

        for (let scr of payload.screen)
            arrScreen.push({value:scr, name:scr});

        $('#combo_screen').dropdown('setup menu', {values: arrScreen});
        $('#combo_screen').dropdown('set selected', payload.selScreen);

        for (let aud of payload.audio )
            arrAudio.push({value:aud.name, name:aud.name});

        $('#combo_audio').dropdown('setup menu', {values: arrAudio});
        $('#combo_audio').dropdown('set selected', payload.selMic);

        for (let cam of payload.video )
            arrCam.push({value:cam.name, name:cam.name});

        $('#combo_cam').dropdown('setup menu', {values: arrCam});
        $('#combo_cam').dropdown('set selected', payload.selCam);

        let pos = 1;

        if (payload.chatPos == -1900)
            pos = 1;
        else if (payload.chatPos == 20)
            pos = 2;
        else if (payload.chatPos == 1940)
            pos = 3;

        $('#combo_pos').dropdown('set selected', pos);
        //$("select[name=bitrate] option").filter(function() {
        //    return $(this).val() == payload.bitrate;
        //}).prop('selected', true);
    }

    if (payload.type == "join") {
        toastr.success(payload.device+"가 "+payload.room+"을 개설하였습니다.");
    }

    if (payload.type == "getstatus") {
        $("#Panel").show();
        $("#roomStatus").hide();

        let devId = $('#setRoom').dropdown("get value");
        if ((payload.isOnAir == true) && (payload.device == devId)) {
            $("#roomStatus").html(payload.room + "에서 방송 중입니다.");
            $("#roomStatus").show();
        }
    }

});
*/

function start() {

    $('#setProj').dropdown({
        onChange: function(value, text, $selectedItem) {
            loadProject(value);
            $("#Panel").show();                    
        }
    })

    $("#Btn_Save").click(()=>{
        let projId = $('#setProj').dropdown("get value")

        $.post("/project/"+projId+"/content", {
            title: $("#title").val(),
            content: $("#content").val()
        }).then(r => {
            console.log(r);
            alert('전송 되었습니다.');
        })

        //let pos = $('#combo_pos').dropdown("get value");

        //if (pos == "1") posX = -1900;
        //if (pos == "2") posX = 20;
        //if (pos == "3") posX = 1940;

        //adminWs.publish(devId, "control", {
        //    type:"start",
        //    chatPosX: posX,
        ///    chatPosY: posY,
        //    use_cam:  $('#use_cam').checkbox("is checked"),
        //    use_mic:  $('#use_mic').checkbox("is checked"),
        //    use_chat: $('#use_chat').checkbox("is checked")
        //});
    });

    $("#Btn_Finish").click(()=>{
        let devId = $('#setRoom').dropdown("get value");
        adminWs.publish(devId, "control", {type:"finish"});
    });

    $('#combo_audio').dropdown({
        onChange: function(value, text, $selectedItem) {
            let devId = $('#setRoom').dropdown("get value");
            adminWs.publish(devId, "control", {type:"setaudio", value:value});
        }
    });

    $('#combo_pos').dropdown({
        onChange: function(value, text, $selectedItem) {
            let devId = $('#setRoom').dropdown("get value");

            let posX, posY = 300;
            let pos = $('#combo_pos').dropdown("get value");

            if (pos == "1") posX = -1900;
            if (pos == "2") posX = 20;
            if (pos == "3") posX = 1940;

            adminWs.publish(devId, "control", {type:"setpos", x:posX, y:posY, });
        }
    });

}

start();