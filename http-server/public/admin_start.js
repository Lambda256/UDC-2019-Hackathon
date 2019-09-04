function stampToDate(stamp) {
    let d = new Date(parseInt(stamp));
    return d.toLocaleDateString();//.replace(/./g,"").replace(/\s/g, "-")    
}

function loadProject(projectId) {

    $.get(`http://localhost:8000/project/${projectId}`).then(r => {
        
        $("#title").val(r.title)
        $("#goal").val(r.goal)
        $("#trooperSelect").val(r.trooperSelect)                        
        $("#date").calendar('set date', stampToDate(r.date));        

        if (r.isClosed != "0") {
            $("#isClosed").checkbox('check');        
        }        
    })

    $.get(`http://localhost:8000/project/${projectId}/content`).then(r => {                
        $("#content").val(r.content)
    })
}

function getProjects() {
    $.get("http://localhost:8000/project/all/").then(r => {
        
        let dropItem = [];

        for (let i = 0; i < r.count; i++) {
            dropItem.push(`<div class="item" data-value="${i}">${i}번</div>`)
        }

        dropItem.push(`<div class="item" data-value="new">신규생성</div>`)

        setProjectDropdown(dropItem)        
    })    
}

        
function newProject() {
    let newName = prompt("신규생성할 프로젝트 이름");
    if (!newName) return;

    $.post(`/project/new/`, {
        title: newName
    }).then(r => {            
        toastr.success("전송 되었습니다.");        
        setTimeout(()=>{ getProjects(); }, 1000);
    })
}

function setProjectDropdown(items) {
    
    if (items) {
        $('#setProj .menu').html(items);
    }
    
    $('#setProj').dropdown({
        onChange: function(value, text, $selectedItem) {
            if (value == "new") {
                newProject()

            } else {
                loadProject(value)
                $("#Panel").show()                   
            }            
        }
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
            loadProject(value)
            $("#Panel").show()                   
        }
    })

    $("#Btn_Save").click(()=>{        
        let projId = $('#setProj').dropdown("get value")

        $("#Btn_Save").addClass("loading");
        
        $.post(`/project/${projId}/content`, {
            title: $("#title").val(),
            content: $("#content").val()
        }).then(r => {
            $("#Btn_Save").removeClass("loading");
            toastr.success("전송 되었습니다.");            
        })
        
        let goal = String($("#goal").val())
        let date = new Date($("#v_date").val()).getTime()
        let trooperSelect = $("#trooperSelect").val()                
        
        $.post(`/project/${projId}/options`, { goal, date, trooperSelect }).then(r => {
            //$("#Btn_Save").removeClass("loading");
            //toastr.success("전송 되었습니다.");            
        })
        
    })
    
    $('#date').calendar({ type: 'date' })
    //$("#Btn_Finish").click(()=>{
    //    let devId = $('#setRoom').dropdown("get value");
    //    adminWs.publish(devId, "control", {type:"finish"});
    //});
    getProjects();

    $('.menu .item').tab();
    
}

start()