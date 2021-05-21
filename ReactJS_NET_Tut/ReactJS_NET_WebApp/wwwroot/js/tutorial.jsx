
class CommentBox extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = { data: [] };
    }
    
    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();        
    }
    
    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        )
    }
    
    render () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
}

class CommentList extends React.Component {
    render () {

        const commentNodes = this.props.data.map(comment => (
            <Comment key={comment.id} author={comment.author}>
                {comment.text}
            </Comment>
        ));

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    render () {
        return (
            <div className="commentForm">Comment form</div>    
        );
    }
}

function createRemarkable() {
    let remarkable = 
        'undefined' != typeof global 
        && global.Remarkable
        ? global.Remarkable 
        : window.Remarkable;
    
    return new remarkable();
}

class Comment extends React.Component {
    
    rawMarkup() {
        const md = new Remarkable();
        const rawMarkup = md.render(this.props.children.toString());
        
        return { __html: rawMarkup };
    }
    
    render () {
        
        const md = createRemarkable();
        
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} /> 
            </div>
        );
    }
}

ReactDOM.render(<CommentBox url="/comments" pollInterval={2000} />, document.getElementById('content'));