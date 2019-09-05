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

    $.get(`http://localhost:8000/project/${projectId}/closing`).then(r => {                
        
        if (r.withdrawAddr != "0x0000000000000000000000000000000000000000") {
            $("#withdraw_content").val(r.content)
            $("#receiver").val(r.withdrawAddr)
            $("#withdraw_content").attr('readonly', true)
            $("#receiver").attr('readonly', true)
            $("#withdraw_content").attr('disabled', true)
        } else {            
            $("#withdraw_content").attr('readonly', false)
            $("#receiver").attr('readonly', false)
        }    
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

function start() {

    $('#setProj').dropdown({
        onChange: function(value, text, $selectedItem) {
            loadProject(value)
            $("#Panel").show()                   
        }
    })

    $("#Btn_Save").click(()=>{   

        let projId = $('#setProj').dropdown("get value")

        $("#Btn_Save").addClass("loading")
        
        $.post(`/project/${projId}/content`, {
            title   : $("#title").val(),
            content : $("#content").val()
        }).then(r => {
            $("#Btn_Save").removeClass("loading")
            toastr.success("전송 되었습니다.")          
        })
        
        let goal = String($("#goal").val())
        let date = new Date($("#v_date").val()).getTime()
        let trooperSelect = $("#trooperSelect").val()                
        
        $.post(`/project/${projId}/options`, { goal, date, trooperSelect })
        .then(r => {})
            
    })

    $("#Btn_Save_Review").click(()=>{

        let projId = $('#setProj').dropdown("get value")
        $("#Btn_Save_Review").addClass("loading")

        $.post(`/review/write/${projId}`, {
            author  : $("#author").val(),
            content : $("#review_content").val()
        }).then(r => {
            $("#Btn_Save_Review").removeClass("loading")
            toastr.success("전송 되었습니다.")          
        })

    });

    $("#Btn_Save_Withdraw").click(()=>{

        let projId = $('#setProj').dropdown("get value")
        $("#Btn_Save_Withdraw").addClass("loading")

        $.post(`/project/${projId}/withdraw`, {
            receiver : $("#receiver").val(),
            content  : $("#withdraw_content").val()
        }).then(r => {
            $("#Btn_Save_Withdraw").removeClass("loading")
            toastr.success("전송 되었습니다.")          
        })

    });
    
    $('#date').calendar({ type: 'date' })
    
    getProjects();

    $('.menu .item').tab();
    
}

start()