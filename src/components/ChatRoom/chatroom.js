import React, { Component } from 'react';
import fire from '../../config';

class ChatRoom extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            message: '',
            counter: 0,
            messages: [],
            id:Date.now()
        }
    }
    // componentDidMount() {
    //     console.log("componentDidMount");
    //     var database = fire.database();
    //     database.ref('Messages/').on("child_added", (snapshot) => {
    //         const currenMessages = snapshot.val().text;

    //         if (currenMessages !== null) {
    //             this.setState({
    //                 messages: currenMessages
    //             })
    //         }
    //     })
    // }

    componentWillMount() {
        const previousMessages = this.state.messages;
       
        var database = fire.database();
        database.ref('Messages/').on("child_added", (snap) => {
            previousMessages.push({
                id: snap.val().id,
                text: snap.val().text
            })
            this.setState({
                messages: previousMessages
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value,
        })
    }
    submitMessage = (e) => {
        console.log("SubmitMessage:", this.state.message);

        const nextMessage = {
            id: Date.now(),
            text: this.state.message
        }
        this.setState({
            message: '',
            counter: this.state.counter + 1
        })
        var database = fire.database();
        database.ref('Messages/' + nextMessage.id).set(nextMessage)
        // var list = Object.assign([], this.state.messages);
        // list.push(nextMessage);

    }

    render() {
        const currenMessage = this.state.messages.map((message, i) => {
            return (
                <li key={message.id}>{message.text} </li>
            )
        })
        return (
            <div>
                <ol>
                    {currenMessage}
                </ol>
                <input type="text" placeholder="message" onChange={this.handleChange} value={this.state.message} />
                <br></br>
                <button type="button" onClick={this.submitMessage}>Submit Message</button>
            </div>
        )
    }
}

export default ChatRoom;