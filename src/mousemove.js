
export const go = () => {
  const ele = document.getElementById('mousemove');
  ele.innerHTML = 'Move your mouse to see the demo';
  ele.addEventListener('mousemove', function(evt) {
    const { screenX, screenY } = evt;
    ele.innerHTML = '<div>Mouse is at: X: ' +
          screenX + ', Y: ' + screenY +
                    '</div>';
  })
}

export default go