export const animateScroll = (el, fromLeft = 0, toLeft, fromTop = 0, toTop, duration = 500) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function requestAnimationFrame(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }

  let stepsLeft;
  if (toLeft !== undefined) {
    const differenceLeft = Math.abs(fromLeft - toLeft);
    stepsLeft = Math.ceil((differenceLeft / duration) * 50);
  }
  let stepsTop;
  if (toTop !== undefined) {
    const differenceTop = Math.abs(fromTop - toTop);
    stepsTop = Math.ceil((differenceTop / duration) * 50);
  }

  function scroll(startT, endT, stepT, startL, endL, stepL) {
    if (
      (startT === endT || stepT === undefined) &&
      (startL === endL || stepL === undefined)
    ) return;

    let dT;
    if (stepT !== undefined) {
      dT = (startT + stepT > endT) ? endT : startT + stepT;
      if (startT > endT) {
        dT = (startT - stepT < endT) ? endT : startT - stepT;
      }
    }

    let dL;
    if (stepL !== undefined) {
      dL = (startL + stepL > endL) ? endL : startL + stepL;
      if (startL > endL) {
        dL = (startL - stepL < endL) ? endL : startL - stepL;
      }
    }

    if (el === window) {
      const dTT = dT === undefined ? window.scrollY : dT;
      const dTL = dL === undefined ? window.scrollX : dL;
      window.scrollTo(dTL, dTT);
    } else {
      if (dT !== undefined) el.scrollTop = dT;
      if (dL !== undefined) el.scrollLeft = dL;
    }
    window.requestAnimationFrame(() => scroll(dT, endT, stepT, dL, endL, stepL));
  }
  scroll(fromTop, toTop, stepsTop, fromLeft, toLeft, stepsLeft);
};

export const getScrollToBottom = (y = 100) => {
  const scrollTop = document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  if (document.documentElement.scrollHeight - y <=
      document.documentElement.clientHeight + scrollTop
  ) {
    return true;
  }
  return false;
};
