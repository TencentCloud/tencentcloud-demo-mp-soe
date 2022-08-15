let manager = null;

Page({
  data: {
    resps: [],

    btnText: '开始录制',

    serverTypeItems: [
      { name: 0, value: '英文', checked: 'true' },
      { name: 1, value: '中文' }
    ],
    evalModeItems: [
      { name: 0, value: '词模式', checked: 'true' },
      { name: 1, value: '句子模式' },
      { name: 2, value: '段落模式' },
      { name: 3, value: '自由说模式' }
    ],
    storageModeItems: [
      { name: 0, value: '放弃存储', checked: 'true' },
      { name: 1, value: '存储音频' }
    ],
    textModeItems: [
      { name: 0, value: '普通文本', checked: 'true' },
      { name: 1, value: '音素结构文本' }
    ],

    soeAppId: '',
    content: 'about',
    serverType: 0,
    storageMode: 3,
    evalMode: 0,
    scoreCoeff: 1.5,
    textMode: 0,
    duration: 8000
  },

  contentBindKeyInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  soeAppIdBindKeyInput(e) {
    this.setData({
      soeAppId: e.detail.value
    })
  },

  scoreCoeffBindKeyInput(e) {
    this.setData({
      scoreCoeff: e.detail.value
    })
  },

  durationBindKeyInput(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  serverTypeChange(e) {
    this.setData({
      serverType: e.detail.value
    })
  },

  evalModeChange(e) {
    this.setData({
      evalMode: e.detail.value
    })
  },

  storageModeChange(e) {
    this.setData({
      storageMode: e.detail.value
    })
  },

  textModeChange(e) {
    this.setData({
      textMode: e.detail.value
    })
  },

  onLoad: function () {

    let plugin = requirePlugin("myPlugin");
    manager = plugin.getSoeRecorderManager({
      secretId: 'yourSecretId',
      secretKey: 'yourSecretKey'
    });

    manager.onSuccess((res) => {
      console.log('test-onSuccess');
      this.setData({
        PronAccuracy: res.PronAccuracy,
        PronFluency: res.PronFluency,
        PronCompletion: res.PronCompletion
      })
    });


    manager.onStop(() => {
      this.setData({
        btnText: '开始录制'
      })
    })

    manager.onStart(() => {
      console.log('test-onstart');
      this.setData({
        resps: [],
        btnText: '录制中'
      })
    })

    manager.onResponse((res) => {
      let array = this.data.resps
      array.push(JSON.stringify(res))
      this.setData({ resps: array })
    })

    manager.onError((res) => {
      console.log(res)
    })
  },

  ontouchstart: function () {

    manager.start({
      content: this.data.content,
      evalMode: this.data.evalMode,
      scoreCoeff: this.data.scoreCoeff,
      serverType: this.data.serverType,
      storageMode: this.data.storageMode,
      soeAppId: this.data.soeAppId,
      textMode: this.data.textMode,
      duration: this.data.duration
    })
  },
  ontouchend: function () {
    manager.stop()
  }
})
