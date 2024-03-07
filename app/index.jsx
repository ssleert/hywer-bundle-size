import { ref } from "hywer"

const App = () => {
  const count = ref(0)

  return <>
    <button onClick={() => count.val++}>
      {count}
    </button>
  </>
}

document.getElementById("app").append(...<><App /></>)
