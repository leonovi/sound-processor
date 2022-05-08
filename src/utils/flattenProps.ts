import { FlowNodeT } from 'components/Flow/Flow.models';

export const flattenProps = <T extends FlowNodeT>(
  props: T
): {
  id: T['id'];
  type: T['type'];
  data: T['data'];
  config: T['data']['config'];
  name: T['data']['config']['name'];
  audioNode: T['data']['config']['audioNode'];
  inputs: T['data']['config']['inputs'];
  methods: T['data']['methods'];
} => ({
  id: props.id,
  type: props.type,
  data: props.data,
  config: props.data.config,
  name: props.data.config.name,
  audioNode: props.data.config.audioNode,
  inputs: props.data.config.inputs,
  methods: props.data.methods,
});
