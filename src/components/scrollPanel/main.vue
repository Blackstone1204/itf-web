<template>

  <div id="scrollpanel">
  	<div id="scroll"><slot></slot></div>
  	<div id="msg" style="font-size:10px" >下滑继续</div>
    
   
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    height: {
      type: String,
      required: true
    },
    width: {
      type:String,
      required: true

    }
  },



  mounted: function() {

    document.getElementById("scroll").style.width = this.width
    document.getElementById("scroll").style.height = this.height
    document.getElementById("scrollpanel").style.width = this.width
    document.getElementById("scrollpanel").style.height = this.height


  }



}

</script>
<style type="text/css" scoped>
#scrollpanel{
/*	  border: 2px solid red;*/
	 /* text-align: center;*/
	  padding: 20px;

}
#msg{
	text-align: center;
}
#scroll{
/*	border: 2px solid red;*/
/*	padding:20px;*/
  overflow-x: scroll;
  overflow-y: scroll;

}

#scroll::-webkit-scrollbar {
  display: none
}

</style>
