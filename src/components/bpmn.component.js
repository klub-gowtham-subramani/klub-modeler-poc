import React, { useEffect, useState, useRef } from "react";

import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import Modeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
// import CamundaExtensionModule from 'camunda-bpmn-moddle/lib';
// import BpmnModeler from 'bpmn-js/lib/Modeler';
// import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.prou';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import "bpmn-js-properties-panel/dist/assets/element-templates.css";

const Bpmn = (props) => {
  const container = useRef(null);
  const propertiesContainer = useRef(null);
  const { diagramXML } = props;
  // const [bpmnViewer, setBpmnViewer] = useState(null);
  let bpmnViewer = null;

  useEffect(() => {
    // const viewer = new Modeler({
    //   container: container.current,
    //   propertiesPanel: {
    //     parent: propertiesContainer.current,
    //   },
    //   additionalModules: [
    //     BpmnPropertiesPanelModule,
    //     BpmnPropertiesProviderModule,
    //     ZeebePropertiesProviderModule,
    //     // CamundaPlatformPropertiesProviderModule,
    //     // CamundaExtensionModule
    //   ],
    //   keyboard: {
    //     bindTo: document
    //   }
    //   })
    // setBpmnViewer(viewer);
    if (!bpmnViewer) {
      console.log("Hello");
      bpmnViewer = new Modeler({
        container: container.current,
        propertiesPanel: {
          parent: propertiesContainer.current,
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          // ZeebePropertiesProviderModule,
          CamundaPlatformPropertiesProviderModule,
          // CamundaExtensionModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        },
        keyboard: {
          bindTo: document,
        },
      });
      displayDiagram(diagramXML);
    }
  }, []);

  // if (bpmnViewer) {
  //   bpmnViewer.importXML(diagramXML);
  // }

  const displayDiagram = (diagram) => bpmnViewer.importXML(diagram);

  return (
    <>
      <div className="react-bpmn-diagram-container" ref={container}></div>
      <div className="js-properties-panel" ref={propertiesContainer}></div>
    </>
  );
};

export default Bpmn;

// export default class ReactBpmn extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = { };

//     this.containerRef = React.createRef();
//   }

//   componentDidMount() {

//     const {
//       url,
//       diagramXML
//     } = this.props;

//     const container = this.containerRef.current;

//     // console.log(`container : ${container}`)

//     this.bpmnViewer = new BpmnJS({ container });

//     // this.bpmnViewer.on('import.done', (event) => {
//     //   const {
//     //     error,
//     //     warnings
//     //   } = event;

//     //   if (error) {
//     //     return this.handleError(error);
//     //   }

//     //   this.bpmnViewer.get('canvas').zoom('fit-viewport');

//     //   return this.handleShown(warnings);
//     // });

//     // if (url) {
//     //   return this.fetchDiagram(url);
//     // }

//     if (diagramXML) {
//       return this.displayDiagram(diagramXML);
//     }
//   }

//   componentWillUnmount() {
//     this.bpmnViewer.destroy();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const {
//       props,
//       state
//     } = this;

//     if (props.url !== prevProps.url) {
//       return this.fetchDiagram(props.url);
//     }

//     const currentXML = props.diagramXML || state.diagramXML;

//     const previousXML = prevProps.diagramXML || prevState.diagramXML;

//     if (currentXML && currentXML !== previousXML) {
//       return this.displayDiagram(currentXML);
//     }
//   }

//   displayDiagram(diagramXML) {
//     this.bpmnViewer.importXML(diagramXML);
//   }

//   fetchDiagram(url) {

//     this.handleLoading();

//     fetch(url)
//       .then(response => response.text())
//       .then(text => this.setState({ diagramXML: text }))
//       .catch(err => this.handleError(err));
//   }

//   handleLoading() {
//     const { onLoading } = this.props;

//     if (onLoading) {
//       onLoading();
//     }
//   }

//   handleError(err) {
//     const { onError } = this.props;

//     if (onError) {
//       onError(err);
//     }
//   }

//   handleShown(warnings) {
//     const { onShown } = this.props;

//     if (onShown) {
//       onShown(warnings);
//     }
//   }

//   render() {
//     return (
//       <div className="react-bpmn-diagram-container" ref={ this.containerRef }></div>
//     );
//   }
// }
