// import { useContext, useEffect } from "react";
// import { HomeContext } from "./HomeContext";
// import { ThemeContext } from "./ThemeContext";
// import { current } from "@reduxjs/toolkit";

// function HomeList() {
//   const homeContext = useContext(HomeContext)

//   useEffect(() => {
//     homeContext.fetchHome()
//   }, [])

//   const {theme, setCurrentTheme, currentTheme} = useContext(ThemeContext);

//   const bgClassName = theme[currentTheme].bgColor

//   return (
//     <div className={bgClassName + " container"}>
//       <p>Loading: {homeContext.loading ? 'yes' : 'no'}</p>
//       <p>Error: {homeContext.error || '-'}</p>
//       <button
//         onClick={() => {
//           setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
//         }}
//       >
//         Toggle Theme: {currentTheme}
//       </button>
//       <h1>Home List</h1>
    


//     </div>
//   )
// }