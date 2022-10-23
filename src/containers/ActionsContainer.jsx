import { giveAwayPossessions } from "../redux/actions/user_actions";
import { useDispatch } from "react-redux";

export function ActionsContainer() {
  const dispatch = useDispatch();

  return (
    <>
      <main>
        <h2>Actions</h2>
        <button onClick={() => dispatch(giveAwayPossessions())}>
          Give It Away!
        </button>
      </main>
    </>
  );
}
