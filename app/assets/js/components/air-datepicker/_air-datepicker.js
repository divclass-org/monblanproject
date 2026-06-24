(function () {
  let localeEn = {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    today: "Today",
    clear: "Clear",
    dateFormat: "MM/dd/yyyy",
    timeFormat: "hh:mm aa",
    firstDay: 0,
  };

  const customFormat = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}_${month}_${year}`;
  };

  let prevArr =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.2609 3.5L11.0834 4.3225L8.41171 7L11.0834 9.6775L10.2609 10.5L6.76087 7L10.2609 3.5Z" fill="black"/> <path d="M6.41676 3.5L7.23926 4.3225L4.56759 7L7.23926 9.6775L6.41676 10.5L2.91676 7L6.41676 3.5Z" fill="black"/></svg>';
  let nextArr =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.73913 3.5L2.91663 4.3225L5.58829 7L2.91663 9.6775L3.73913 10.5L7.23913 7L3.73913 3.5Z" fill="black"/> <path d="M7.58324 3.5L6.76074 4.3225L9.43241 7L6.76074 9.6775L7.58324 10.5L11.0832 7L7.58324 3.5Z" fill="black"/> </svg> ';

  const baseOptions = {
    locale: localeEn,
    autoClose: true,
    position: "bottom left",
    offset: 2,
    navTitles: {
      days: "<strong>MMMM yyyy</strong>",
    },
    prevHtml: prevArr,
    nextHtml: nextArr,
    dateFormat: customFormat,
    minDate: new Date(2016, 1, 17),
    isMobile: window.innerWidth < 768,
  };

  const toggleSelect = (date, datepicker) => {
    let inputWrapper = datepicker.$el.closest(".filters-input");
    if (inputWrapper) {
      if (date) {
        inputWrapper.classList.add("selected");
      } else {
        inputWrapper.classList.remove("selected");
      }
    }
  };


  let dpMin, dpMax;

  dpMin = new AirDatepicker("#dc-airdatepicker-minimum", {
    ...baseOptions,
    onSelect({ date, formattedDate, datepicker }) {
      toggleSelect(date, datepicker);
      dpMax.update({
        minDate: date,
      });
    },
  });

  const clearBtnFrom = document.querySelector(
    "#filter-min .filters-input__btn--clear",
  );

  clearBtnFrom.addEventListener("click", (e) => {
    e.preventDefault();
    dpMin.clear();
  });

  dpMax = new AirDatepicker("#dc-airdatepicker-maximum", {
    ...baseOptions,
    onSelect({ date, formattedDate, datepicker }) {
      toggleSelect(date, datepicker);
      dpMin.update({
        maxDate: date,
      });
    },
  });

  const clearBtnTo = document.querySelector(
    "#filter-max .filters-input__btn--clear",
  );
  const showCalenderTo = document.querySelector(
    "#filter-max .filters-input__btn--calendar",
  );

  clearBtnTo.addEventListener("click", (e) => {
    e.preventDefault();
    dpMax.clear();
  });


  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const currentWidth = entry.contentRect.width;
      const isMobileNow = currentWidth < 768;

      dpMin.update({ isMobile: isMobileNow });
      dpMax.update({ isMobile: isMobileNow });
    }
  });

  resizeObserver.observe(document.body);

})();
