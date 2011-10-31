function run_timer(TargetDate) {

    //TargetDate = "07/11/2011 6:00 PM";
    CountActive = true;
    Counter = -1;
    LeadingZero = true;
    DisplayFormat = "<div class=\"cnt-dn-digits\">%%D%%</div>" +
                    "<div class=\"cnt-dn-colon\">:</div>" +
                    "<div class=\"cnt-dn-digits\">%%H%%</div>" +
                    "<div class=\"cnt-dn-colon\">:</div>" +
                    "<div class=\"cnt-dn-digits\">%%M%%</div>" + 
                    "<div class=\"cnt-dn-colon\">:</div>" +
                    "<div class=\"cnt-dn-digits\">%%S%%</div>"; 
    //ExpireMessage = "done";

        createDiv("cnt-dn-labels", "Seconds", "cnt-dn-label-wrap");
        createDiv("cnt-dn-labels", "Minutes", "cnt-dn-label-wrap");
        createDiv("cnt-dn-labels", "Hours", "cnt-dn-label-wrap");
        createDiv("cnt-dn-labels", "Days", "cnt-dn-label-wrap");

        function createDiv(className, innerHTML, parent) {
            div = document.createElement("div");
            div.className = className;
            div.innerHTML = innerHTML;
            document.getElementById(parent).appendChild(div);
        }


        function calculate(secs, num1, num2) {
          s = ((Math.floor(secs/num1))%num2).toString();
          if (LeadingZero && s.length < 2)
            s = "0" + s;
          return "<span class=\"cnt-dn-digit\">" + s.substr(0,1) + 
                 "</span><span class=\"cnt-dn-digit\">" + s.substr(1,1) + "</span>";
        };

        function CountDown(secs) {
          if (secs < 0) {
            //document.getElementById("cnt-dn-clock").innerHTML = ExpireMessage;
            // do nothing, keep timer at zero 
            return;
          };
          DisplayStr = DisplayFormat.replace(/%%D%%/g, calculate(secs,86400,100000));
          DisplayStr = DisplayStr.replace(/%%H%%/g, calculate(secs,3600,24));
          DisplayStr = DisplayStr.replace(/%%M%%/g, calculate(secs,60,60));
          DisplayStr = DisplayStr.replace(/%%S%%/g, calculate(secs,1,60));

          document.getElementById("cnt-dn-clock").innerHTML = DisplayStr;
          if (CountActive)
            setTimeout(function(){CountDown(secs+Counter);}, SetTimeOutPeriod);
        };

        Counter = Math.ceil(Counter);
        if (Counter == 0)
          CountActive = false;
        var SetTimeOutPeriod = (Math.abs(Counter)-1)*1000 + 990;
        var dthen = new Date(TargetDate);
        var dnow = new Date();
        if(Counter>0)
          ddiff = new Date(dnow-dthen);
        else
          ddiff = new Date(dthen-dnow);
        gsecs = Math.floor(ddiff.valueOf()/1000);
        CountDown(gsecs);
}
