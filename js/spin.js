const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],monthMin = ['','','','','','','','','','','',''],days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],daysMin = ['','','','','','',''],seasons = ['invierno','primavera','verano','otoño'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","monthOnly"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, monthOnly: getMonthName(_month, monthsName, false, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}

$(document).ready(function () {
  // -------------spin-------------------
  var resultWrapper = document.querySelector(".spin-result-wrapper");
  var wheel = document.querySelector(".wheel-img");

  $(".active").click(function () {
    if (wheel.classList.contains("rotated")) {
      resultWrapper.style.display = "block";
    } else {
      wheel.classList.add("super-rotation");
      setTimeout(function () {
        resultWrapper.style.display = "block";
      }, 8000);
      setTimeout(function () {
        $(".spin-wrapper").slideUp();
        $(".order_block").slideDown();
      }, 10000);
      wheel.classList.add("rotated");
    }
  });
  var closePopup = document.querySelector('.close-popup');
  $('.close-popup, .pop-up-button').click(function (e) {
      e.preventDefault();
      $('.spin-result-wrapper').fadeOut();
  });

  // -------------TIMER------------------------
  var fiveSeconds = new Date().getTime() + 600000;
  $("#clock")
    // .countdown(fiveSeconds, { elapse: true })
    .on("update.countdown", function (event) {
      var $this = $(this);
      if (event.elapsed) {
        $this.html("00 : 00");
      } else {
        $this.html(event.strftime("<span>%M</span> : <span>%S</span>"));
      }
    });
});

$('a.scrollto').on('click', function() {
  let href = $(this).attr('href');
  $('html, body').animate({
      scrollTop: $(href).offset().top
  }, {
      duration: 370,
      easing: "linear"
  });
  return false;
});

function startTimer(duration, min, sec) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    min.textContent = minutes;
    sec.textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 10,
    minutes = document.querySelector("#min");
  seconds = document.querySelector("#sec");
  startTimer(fiveMinutes, minutes, seconds);
};
