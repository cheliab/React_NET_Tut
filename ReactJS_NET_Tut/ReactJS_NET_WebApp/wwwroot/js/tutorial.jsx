
class CommentBox extends React.Component {
    render () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
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

const data = [
    { id: 1, author: 'Daniel Lo Nigro', text: 'Hello React.NET World!' },
    { id: 2, author: 'Pete Hunt', text: 'This is one comment' },
    { id: 3, author: 'Jordan Walke', text: 'This is *another* comment' },
];

ReactDOM.render(<CommentBox data={data} />, document.getElementById('content'));