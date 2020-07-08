import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import("../pages/notes/data.json").then((years) =>
  years["default"].forEach(append_dropdown)
);

var options = [];

function append_dropdown(item, index) {
  options.push({ value: item, label: item.replace(/_/g, " ") });
  //   console.log(test_options);
}

function Sidebar() {
  const [count, setCount] = useState([""]);
  const [module, setModule] = useState(false);

  function selectModule(element) {
    setModule(element);
  }

  function Module_layer() {
    return (
      <div className="divide-y divide-gray-400">
        {count.map((element) => (
          <div className="text-center py-2" key={element}>
            <button onClick={() => selectModule(element)}>
              {element.replace(/_/g, " ")}
            </button>
          </div>
        ))}
      </div>
    );
  }

  function unsetModule() {
    setModule(false);
  }

  function Submodule_layer() {
    return (
      <>
        <div className="grid grid-cols-8 gap-2">
          <button className="col-span-1" onClick={unsetModule}>
            <svg
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
          <h1 className="text-2xl col-span-7">{module.replace(/_/g, " ")}</h1>
        </div>
        <hr className="border-gray-400 border-2 mt-2" />
      </>
    );
  }

  function Switching() {
    if (module) {
      return <Submodule_layer />;
    } else {
      return <Module_layer />;
    }
  }

  // This function sets the state to the modules to be listed, it might be nicer to have the state be the year, and the fetching be handled in the component
  function handleChange(selectedOption) {
    import(
      "../pages/notes/" + selectedOption.value + "/data.json"
    ).then((module) => setCount(module["default"]));
    unsetModule();
  }
  return (
    <div className="flex-none w-full max-w-xs text-black bg-gray-200 p-4 shadow-xl rounded-br">
      <Select
        options={options}
        onChange={handleChange}
        isClearable={false}
        isSearchable={false}
        instanceId={1}
      />
      <hr className="mb-4" />
      <Switching />
    </div>
  );
}

export default Sidebar;