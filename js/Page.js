var React = require('react');

var Page = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },

  handleChange2: function(event, index) {
    this.setState({
    // value: event.target.value
    });
    this.props.handleChange2(event, index);
  },

  onDoubleClick: function(event) {
      // Clear the input
      this.setState({value: this.state.value}, function() {
        // This code executes after the component is re-rendered
        React.findDOMNode(this.refs.theInput2).focus();   // Boom! Focused!
      });
      this.props.onDoubleClick(event);
  },

  onClickClose: function (index) {
    this.props.onClickClose(index);
    //this.setState({
    //  value: this.props.value
    //});
  },

  render: function() {

    var pageClass;

    if (this.props.home) {
      pageClass = this.props.marked? 'page-home-marked' : 'page-home';
    } else {
      pageClass = this.props.marked? 'page-marked' : 'page-usual';
    }

    if (this.props.edited) {
      var pageNameClass = 'page-name-hidden';
      var pageNameEdit  = 'page-name-edit';
    } else {
      var pageNameClass = 'page-name';
      var pageNameEdit  = 'page-name-edit-hidden';
    }

    var onCheckClass = (this.props.active)? 'check' : 'check-inactive';

    var onCloseClass = (this.props.active && (!this.props.home))? 'close' : 'close-inactive';

    var value = this.state.value;

    return (
      <div id="page" className={pageClass} 
                                onMouseOver={this.props.onMouseOver}
                                onMouseOut={this.props.onMouseOut}
                                onClick={this.props.onClick}
                                >
        <table>
        <tr>
          <td>
            <span className={pageNameClass} onDoubleClick={this.onDoubleClick}>{this.state.value}</span>
 
            <span className={pageNameEdit}>
              
              <form role='form' onSubmit={this.props.editPageName}>
                  <input type='text' onChange={this.handleChange2} value={value} ref="theInput2" />
              </form>

            </span>
          </td>
          <td>
            <span className={onCheckClass}><label><input  type="checkbox" >menu</input></label></span>
            <button className={onCloseClass} onClick={this.onClickClose}>delete</button>
          </td>
        </tr>
        </table>
      </div>
    );
  }
});

module.exports = Page;