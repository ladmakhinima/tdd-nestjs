import { UPDATE_CATEGORY } from '../../app-config/app-events.constant';

export function SendUpdatedCategoryEvent() {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...params) {
      const result = await original.apply(this, params);
      this.eventEmitter.emit(UPDATE_CATEGORY, result);
      return result;
    };
    return descriptor;
  };
}
