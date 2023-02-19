import { useRef } from "react";

function TestForm(props) {
  // インプット要素への参照をuseRef Hooksを用いて定義
  const titleInputRef = useRef();
  const contentInputRef = useRef();

  // formのsubmitが行われると呼ばれる関数を定義
  function submitHandler(event) {
    event.preventDefault();

    // インプット要素から値を取得
    const enteredTitle = "";//titleInputRef.current.value;
    const enteredContent = "";//contentInputRef.current.value;

    const contactData = {
      title: enteredTitle,
      content: enteredContent,
    };

    // 親コンポーネントからpropsで渡された関数を実行
    props.sendData(contactData);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" required id="title" ref={titleInputRef}></input>
        <label htmlFor="content">Content</label>
        <input type="text" required id="content" ref={contentInputRef}></input>
        <input type="submit" />
      </div>
    </form>
  );
}

export default TestForm;