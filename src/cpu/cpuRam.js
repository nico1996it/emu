import { observable } from "mobx"

class Ram {

   memory = new Uint8Array(2048);
   @observable memoryView=[];


    refreshMemoryView() {
        this.memoryView = Array.prototype.slice.call(this.memory).map(value=>


            value.toString(16)

        );

    }



}

export default new Ram()
