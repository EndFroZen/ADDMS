"use client";
import "./Create.css";

const Create = () => {
  const handleSelectChange = (e: any) => {
    const checkboxDiv = document.querySelector(".checkbox");

    if (checkboxDiv !== null) {
      if (e.target.value === "nodejs") {
        checkboxDiv.innerHTML = `
          <label>
            <input type="checkbox" name="express" required/> Express
          </label>
        `;
      } else {
        checkboxDiv.innerHTML = "";
      }
    }
  };

  return (
    <div className="maincon">
      <form action="http://127.0.0.1:3001/create" method="post">
        <input type="text" name="domain" placeholder="Enter domain" required />
        <select name="langue" onChange={handleSelectChange} required>
          <option value="null">Select language</option>
          <option value="nodejs">Node js</option>
          <option value="golang">Go</option>
        </select>
        <div className="checkbox"></div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
