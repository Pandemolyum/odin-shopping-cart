import { useNavigate } from "react-router";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Hmmm, this page does not seem to exist.</h2>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}
