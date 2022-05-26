var getCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};


function setup() {
    let texttest = getCookie("userNickName")
    $("#name-goes-here2").html(texttest+"!")
}

$(document).ready(setup)