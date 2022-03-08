import { Module } from 'components/Flow/Flow.models';

const extractModule = (data: Module): AudioNode | null => data.module;

export { extractModule };
