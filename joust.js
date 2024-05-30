(function(){
    var TXT =
        {
            PLAYBTN: 'Click to play Joust demo',
            LOAD:    'Downloading Game',
            EXECUTE: 'Starting Game',
            DLERROR: 'Error while downloading game data.\nCheck your internet connection.',
            NOWEBGL: 'Your browser or graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br>Find out how to get it <a href="http://get.webgl.org/">here</a>.',
            TEST: 'Loading Game',
        };
    var canvas = document.getElementById('canvas2'), ctx;
    var Msg = function(m)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#BBB';
        for (var i = 0, a = m.split('\n'), n = a.length; i != n; i++)
            ctx.fillText(a[i], canvas.width/2, canvas.height/2-(n-1)*20+10+i*40);
    };
    var Fail = function(m)
    {
        Msg(TXT.TEST);
        // canvas.outerHTML = '<div style="max-width:90%;width:'+canvas.clientWidth+'px;height:'+canvas.clientHeight+'px;background:#000;display:table-cell;vertical-align:middle"><div style="background-color:#FFF;color:#000;padding:1.5em;max-width:640px;width:80%;margin:auto;text-align:center">'+TXT.NOWEBGL+(m?'<br><br>'+m:'')+'</div></div>';
    };
    var DoExecute = function()
    {
        Msg(TXT.EXECUTE);
        Module.canvas = canvas.cloneNode(false);
        Module.canvas.oncontextmenu = function(e) { e.preventDefault() };
        Module.setWindowTitle = function(title) { };
        Module.postRun = function()
        {
            if (!Module.noExitRuntime) { Fail(); return; }
            canvas.parentNode.replaceChild(Module.canvas, canvas);
            Txt = Msg = ctx = canvas = null;
            Module.canvas.focus();
        };
        setTimeout(function() { Module.run(['/p']); }, 50);
    };
    var DoLoad = function()
    {
        Msg(TXT.LOAD);
        window.onerror = function(e,u,l) { Fail(e+'<br>('+u+':'+l+')'); };
        Module = { TOTAL_MEMORY: 1024*1024*24, TOTAL_STACK: 1024*1024*2, currentScriptUrl: '-', preInit: DoExecute };
        var s = document.createElement('script'), d = document.documentElement;
        s.src = 'joustDemo.js';
        s.async = true;
        s.onerror = function(e) { d.removeChild(s); Msg(TXT.DLERROR); canvas.disabled = false; };
        d.appendChild(s);
    };
    var DoSetup = function()
    {
        canvas.onclick = function()
        {
            if (canvas.disabled) return;
            canvas.disabled = true;
            // canvas.scrollIntoView();
            DoLoad();
        };
        ctx.fillStyle = '#BBB';
        ctx.fillRect(canvas.width/2-254, canvas.height/2-104, 508, 208);
        ctx.fillStyle = '#025';
        ctx.fillRect(canvas.width/2-250, canvas.height/2-100, 500, 200);
        ctx.fillStyle = '#BBB';
        ctx.fillText(TXT.PLAYBTN, canvas.width/2, canvas.height/2+10);
    };
    canvas.oncontextmenu = function(e) { e.preventDefault() };
    ctx = canvas.getContext('2d');
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    DoSetup();
})()