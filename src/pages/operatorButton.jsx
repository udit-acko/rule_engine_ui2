export default function OperatorButton(props) {
    return (
        <div className="operator row justify-content-center mt-2 mb-2">
            <div className="form-check col" style={{maxWidth:60}}>
                <input className="form-check-input" type="radio" name={`flexRadioDefault${props.name}`} id="flexRadioDefault1" />
                <label className="form-check-label" for="flexRadioDefault1">OR</label>
            </div>
            <div className="form-check col" style={{maxWidth:60}}>
                <input className="form-check-input" type="radio" name={`flexRadioDefault${props.name}`} id="flexRadioDefault1" />
                <label className="form-check-label" for="flexRadioDefault1">AND</label>
            </div>
        </div>)
}