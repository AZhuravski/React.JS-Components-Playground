var React = require('react');

var Page = require('./Page');

var PageList = React.createClass({

  getInitialState: function() {

    return {
      pages: [,
        { value:'Home Page', done: false, active: false, marked: false, edited: false, home: true },
        { value:'page aaa' , done: true,  active: false, marked: false, edited: false },
        { value:'page bbb' , done: true,  active: false, marked: false, edited: false },
        { value:'page ccc' , done: true,  active: false, marked: false, edited: false },
        { value:'page ddd' , done: true,  active: false, marked: false, edited: false }
      ],
      inputValue: '',
      inputValue2: '',
      addActive: false
    };
  },

  addPage: function() {

    var pages = this.state.pages;

    pages.push({
      value: this.state.inputValue,
      done: false,
      active: false,
      marked: false,
      edited: false
    });

    this.setState({
      pages: pages,
      inputValue: '',
      addActive: false
    });

    // Return false for form
    return false;
  },

  handleChange: function(event) {    
    this.setState({
      inputValue: event.target.value
    });
  },

  handleChange2: function(index, event) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.value = event.target.value;
    this.state.pages.splice(index, 1, page); 

    this.setState({
      inputValue2: event.target.value,
      pages: pages
    });
  },

  removePage: function(index) {
    var pages = this.state.pages;
    pages.splice(index, 1); 

    this.setState({
      pages: pages
    });
  },

  mouseOver: function(index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.active = true;
    this.state.pages.splice(index, 1, page);  

    this.setState({
      pages: this.state.pages
    });
  },

  mouseOut: function(index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.active = false;
    this.state.pages.splice(index, 1, page); 

    this.setState({
      pages: this.state.pages
    });  
  },

  mark: function (index, event) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    var target = event.target;

    if (target.tagName == 'DIV' || target.tagName == 'SPAN') {
      page.marked = !page.marked;
      pages.splice(index, 1, page); 

      this.setState({
        pages: pages
      });
    }
  },

  edit: function (index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.edited = true;
    pages.splice(index, 1, page);  

    this.setState({
      pages: pages
    });
  },

  onClickAdd: function () {

    this.setState({
      addActive: true
    });

    this.setState({value: ''}, function() {
      React.findDOMNode(this.refs.theInput).focus();
    });
  },

  editPageName: function (index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.value = this.state.inputValue2? this.state.inputValue2 : page.value;
    page.edited = false;
    pages.splice(index, 1, page);

    this.setState({
      pages: pages,
      inputValue2: ''
    });

    // Return false for form
    return false;
  },

  render: function() {

    var pages = this.state.pages.map(function(page, index) {
      return (
        <Page
        key={index}
        value={page.value}
        done={page.done}
        active={page.active}
        home={page.home}
        marked={page.marked}
        edited={page.edited}
        onClickClose={this.removePage.bind(this, index)} 
        onMouseOver={this.mouseOver.bind(this, index)}
        onMouseOut={this.mouseOut.bind(this, index)}
        onClick={this.mark.bind(this, index)}
        onDoubleClick={this.edit.bind(this, index)}
        handleChange2={this.handleChange2.bind(this, index)}
        editPageName={this.editPageName.bind(this, index)}
      /> );
    }.bind(this));

    var addPageFormClass = this.state.addActive? 'addPageForm' : 'addPageForm-hidden';

    var addPageInitialButtonClass = this.state.addActive? 'addPageInitialButton-hidden' : 'addPageInitialButton';

    return (
        <div className='container'>
          <h1>CodeX Test Task</h1>
          {pages}
          <form className={addPageFormClass} role='form' onSubmit={this.addPage}>
            <div className=''>
              <input type='text' value={this.state.inputValue}
                onChange={this.handleChange}
                className=''
                placeholder='Write new page name'
                ref="theInput"
              />
              <span className='addPageButton'> 
                <button className=''>add page</button>
              </span>
            </div>
          </form>
          <span className={addPageInitialButtonClass}> 
            <button className='' onClick={this.onClickAdd}>+ add page</button>
          </span>
        </div>
    );
  }
});

module.exports = PageList;