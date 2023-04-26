import React from "react";
import ReactBpmn from "./bpmn.component";

class ExternalLoadedBpmn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    const { url } = props;

    fetch(url).then(res => res.text()).then(diagramXML => {
      this.setState({
        diagramXML
      });
    });
  }

  componentDidMount() {
    console.log("HIIII");
  }

  render() {

    const {
      onError,
      onShown,
      onLoading
    } = this.props;

    const { diagramXML } = this.state;

    return (
      diagramXML
        ? <ReactBpmn
            diagramXML={ diagramXML }
            onLoading={ onLoading }
            onShown={ onShown }
            onError={ onError }
          />
        : null
    );
  }

}

export default ExternalLoadedBpmn;
