<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="3"
      style="margin-left:0.5em;"
    >
      <vs-card>
        <div slot="header">
          <h3>
            Hello world !
          </h3>
        </div>
        <div>
          <span>This is content of card</span>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end" >
            <vs-button
              type="gradient"
              color="danger"
              icon="favorite"
              style="margin-right:0.5em;"
            ></vs-button>
            <vs-button color="primary" icon="turned_in_not" style="margin-right:0.5em;"></vs-button>
            <vs-button
              color="rgb(230,230,230)"
              color-text="rgb(50,50,50)"
              icon="settings"
            ></vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="3"
      style="margin-left:0.5em;"
    >
      <vs-card>
        <div slot="header">
          <h3>
            Hello world !
          </h3>
        </div>
        <div>
          <span>This is content of card</span>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end" >
            <vs-button
              type="gradient"
              color="danger"
              icon="favorite"
              style="margin-right:0.5em;"
            ></vs-button>
            <vs-button color="primary" icon="turned_in_not" style="margin-right:0.5em;"></vs-button>
            <vs-button
              color="rgb(230,230,230)"
              color-text="rgb(50,50,50)"
              icon="settings"
            ></vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'ProductCard',
};
</script>

<style>

</style>
