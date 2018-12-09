window.Activity = {};





class List extends React.Component {
    constructor(props) {
        super(props);
        this.deletFromList = this.deletFromList.bind(this);
        this.returnToList = this.returnToList.bind(this);
        this.generateActivityString = this.generateActivityString.bind(this);
    }

    generateActivityString(activity) {
        var new_activity = `${activity.name}`;

        return new_activity;
    }
    deletFromList(event) {
        this.props.deletFromList(event);
    }
    returnToList(event){
        this.props.backToList(event.target.innerText);

    }
    render() {
        return (
            <div className="todo" >
                {this.props.activities.map((activity, i) => <div key={i} className="list" >
                <input type="checkbox" ></input><span>{i + 1}. </span ><span onClick={this.returnToList} ref={input => this.name = input}>{this.generateActivityString(activity)} </span><img id={i} className="delete" src="delete-512.png" onClick={this.deletFromList}></img></div>)}
            </div>
        );
    }
}

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            done: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletFromList = this.deletFromList.bind(this);
        this.deletForGood = this.deletForGood.bind(this);
        this.backToList = this.backToList.bind(this);



    }
    backToList(event){
        console.log(event);
        var new_activity = {
            name: event
        };
        this.state.activities.push(new_activity);
        this.setState({
            activities: this.state.activities,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var new_activity = {
            name: this.name.value,
        };
        this.state.activities.push(new_activity);
        this.setState({
            activities: this.state.activities,
        });
    }
    deletFromList(event) {
        var deletFromList = event.target.id;
        var newArr = this.state.activities;
        var addToDone = this.state.activities[deletFromList];
        var newDone = this.state.done;
        newDone.push(addToDone);
        newArr.splice(deletFromList, 1);
        this.setState({
            done: newDone,
            activities: newArr
        });
    }
    deletForGood(event){
        var deletFromList = event.target.id;
        var newDone = this.state.done;
        newDone.splice(deletFromList, 1);
        this.setState({
            done: newDone,
        });
    }

    render() {
        return (
            <div >
                <div className="header"><img className="headerimg" src="img2.jpg"></img>My check list</div>
                <div className="lists">
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <input className="makeNewActivity" ref={input => this.name = input} placeholder="add to list..."></input>
                        </form>
                        <List activities={this.state.activities} deletFromList={this.deletFromList} backToList={event}/>
                    </div>
                    <div className="second_list">
                        <div className="done_list"><span>done list</span></div>
                        <List activities={this.state.done} deletFromList={this.deletForGood} backToList={this.backToList}/>
                    </div>
                </div>
            </div>
        );
    }
}

function render() {
    ReactDOM.render(
        <Activities />,
        document.getElementById("root")
    );
}

render();