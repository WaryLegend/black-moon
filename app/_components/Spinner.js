function Spinner({ className = "", type = "circle", color, size }) {
  const classMap = {
    bar: "spinnerbar",
    mini: "spinner-mini",
    circle: "spinner",
  };

  const style = { "--spinner-color": color };

  if (size) {
    style["--spinner-size"] = size + "px";
  }

  return <div className={`${classMap[type]} ${className}`} style={style} />;
}

export default Spinner;
