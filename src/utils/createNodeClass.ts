import { NodeTypes } from "components/Nodes/models";

export const createNodeClass = (type: NodeTypes) => `${type.toLowerCase()}-node`;
