
function WelcomeContainer(props) {

    return (
        <div style={{ position: "fixed", 'width': "100%", paddingTop: "20px" }}>
            <h1>Welcome to the Stress Test!</h1>
            <div>
                <p>I hope that you enjoy the tests!</p>
                <p><b>Note</b>: The <b>highest-score</b> participant will be rewarded 
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/100-Euro.svg/1280px-100-Euro.svg.png"
                        style={{ height: "100px", paddingLeft: "10px", paddingRight: "10px" }}    
                    />
                    in cash!!!
                </p>
                <p><b>Note</b>: The <b>top-3</b> participants have the chance to win a 
                    <img 
                        src="https://www.cdn-docs-ck.com/ck_img/zoom/57597/20_euro_coupon_.jpg"
                        style={{ height: "100px", paddingLeft: "10px", paddingRight: "10px" }}
                    />
                    coupon!
                </p>
                <h4>Be competitive to win the prizes!!!</h4>
            </div>
            <img 
                src={`${process.env.PUBLIC_URL}/assets/images/cool.png`} 
                style={{ height: "100px", marginTop: "20px"}}/>
        </div>
    )
}

export default WelcomeContainer;