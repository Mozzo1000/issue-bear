import { Alert } from "flowbite-react";
import { useToastDispatchContext } from "./ToastContext";
import InfoIcon from "./assets/logo.svg"

export default function Toast({ type, message, id }) {
    const dispatch = useToastDispatchContext();
    return (
        <>
            {type == "success" && (
                <Alert color="success" onDismiss={() => {
                    dispatch({ type: "DELETE_TOAST", id });
                }}>
                    {message}
                </Alert>
            )}
            {type == "error" && (
                <Alert color="failure" onDismiss={() => {
                    dispatch({ type: "DELETE_TOAST", id });
                }}>
                    {message}
                </Alert>
            )}
        </>
    );
}