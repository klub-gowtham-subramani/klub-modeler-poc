// import ExternalLoadedBpmn from "../components/external-bpmn.component";
import dynamic from 'next/dynamic'

const BpmnViewer = dynamic(() => import('@/components/bpmn-viewer.component'), {
  ssr: false,
})

const ExternalLoadedBpmn = dynamic(() => import('@/components/external-bpmn.component'), {
  ssr: false,
})
// import ReactBpmn from 'react-bpmn';

export default function Home() {

  function onError(err) {
    console.error('failed to render diagram', err);
  }

  function onLoading() {
    console.log('loading diagram');
  }

  function onShown() {
    console.log('diagram shown');
  }

  return (
      <ExternalLoadedBpmn
        url="http://localhost:8080/test-process.bpmn"
        onLoading={onLoading}
        onShown={onShown}
        onError={onError}
      />
  );
}
