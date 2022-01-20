import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from 'react';


const ProgressBarTimer = (props) => {
    const { totalTimeInSeconds, timeLeftInSeconds } = props;
    const [variantStatus, setVariantStatus] = useState("success");
    const [animated, setAnimatedStatus] = useState(false);

    useEffect(() => {
        let percentage = timeLeftInSeconds / totalTimeInSeconds * 100;
        if (percentage <= 100 && percentage > 60) {
            setVariantStatus("success");
        }
        else if (percentage <= 60 && percentage > 20) {
            setVariantStatus("warning");
        }
        else if (percentage <= 20) {
            setVariantStatus('danger')
        }

        if (percentage === 100) {
            setAnimatedStatus(false)
        }
        else setAnimatedStatus(true)

    }, [timeLeftInSeconds, totalTimeInSeconds]);

    return (
        <div style = {{width: "60%", display: "block", margin: "auto" }}>
			<h6>Time left: {timeLeftInSeconds} seconds</h6> 
			<ProgressBar
				style = {{ height: "25px" }} 
				striped
				variant = {variantStatus}
				animated = {animated}
				label = {`${timeLeftInSeconds} seconds`}
				now = {timeLeftInSeconds / totalTimeInSeconds * 100} />
		</div>
    )
}

export default ProgressBarTimer;