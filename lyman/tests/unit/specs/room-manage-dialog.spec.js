import { mount　} from '@vue/test-utils'
import RoomMangaeDialog from '@/assets/js/components/room-manage-dialog.vue'

describe('RoomMangaeDialog', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(RoomMangaeDialog);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});