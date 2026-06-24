function getElementSizes(selector) {
  const elem = document.querySelector(selector);
  if (!elem) return null;

  const styles = window.getComputedStyle(elem);
  const width = parseInt(styles.width, 10) || 0;
  const height = parseInt(styles.height, 10) || 0;

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const minVal = Math.min(centerX, centerY);

  const minRad = minVal - Math.floor((32 * minVal) / 100);

  return { centerX, centerY, maxRadius: minVal, minRadius: minRad };
}

function createShapeWithoutGsap(options) {
  const points = [];
  const path = options.element;
  const slice = (Math.PI * 2) / options.numPoints;
  const startAngle = random(Math.PI * 2);

  for (let i = 0; i < options.numPoints; i++) {
    const angle = startAngle + i * slice;
    points.push({
      angle: angle,
      speed: random(0.001, 0.003),
      phase: random(Math.PI * 2),
    });
  }

  function animate(time) {
    const currentPoints = points.map((p) => {
      const progress = (Math.sin(time * p.speed + p.phase) + 1) / 2;

      const radius =
        options.minRadius + (options.maxRadius - options.minRadius) * progress;

      return {
        x: options.centerX + Math.cos(p.angle) * radius,
        y: options.centerY + Math.sin(p.angle) * radius,
      };
    });

    path.setAttribute("d", cardinal(currentPoints, true, 1));

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function cardinal(data, closed, tension = 1) {
  if (data.length < 1) return "M0 0";
  const size = data.length - (closed ? 0 : 1);
  let path = `M${data[0].x} ${data[0].y} C`;

  for (let i = 0; i < size; i++) {
    let p0 = closed
      ? data[(i - 1 + size) % size]
      : i === 0
        ? data[0]
        : data[i - 1];
    let p1 = data[i];
    let p2 = data[(i + 1) % size];
    let p3 = closed ? data[(i + 2) % size] : i === size - 1 ? p2 : data[i + 2];

    let x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
    let y1 = p1.y + ((p2.y - p0.y) / 6) * tension;
    let x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
    let y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

    path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
  }
  return closed ? path + "z" : path;
}

function random(min, max = min) {
  if (min > max) [min, max] = [max, min];
  return min + (max - min) * Math.random();
}

const sizes = getElementSizes(".dc-shape");
const pathElement = document.querySelector("#pathfill1");

if (sizes && pathElement) {
  createShapeWithoutGsap({
    element: pathElement,
    numPoints: 10,

    centerX: sizes.centerX,
    centerY: sizes.centerY,
    minRadius: sizes.minRadius,
    maxRadius: sizes.maxRadius - 10,
  });
}
