import OutFocusMask from './out-focus-mask';
import Api from 'common/api';

export default class MonitoringEvents {
  constructor(params) {
    this.OutFocusMask = new OutFocusMask('#task-content-iframe');

    this.activityTimer = null;
    this.ACTIVITY_TIME = 60;

    this.eventMaskElement = null;
    this.eventMaskTimer = null;
    this.EVENT_MASK_TIME = 30;

    this.taskId = params.taskId;
    this.courseId = params.courseId;
    this.sign = params.sign;
    this.record = params.record;
    this._initInterval = params._initInterval;
    this._clearInterval = params._clearInterval;

    this.initEvent();
  }

  initEvent() {

    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
      return;
    }
    this.initMaskElement();
    this.initVisibilitychange();
    this.initActivity();
  }

  initMaskElement() {
    let element = `
      <div class="monitor-event-mask" style="position: fixed; left: 0; right: 0; top: 0; bottom: 0; opacity: 0; display: none;"></div>
    `;
    $('body').append(element);
    this.eventMaskElement = $('.monitor-event-mask');
    this.maskElementShow();
  }

  triggerEvent(type) { // 触发事件
    this._doing();
    if (type === 'exist_new_learning') {
      this.OutFocusMask.initAntiBrushTips();
      return;
    }
    this.OutFocusMask.initLearStopTips();
  }

  initVisibilitychange() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.triggerEvent('visibilitychange');
      }
    });
  }

  initActivity() { // 监控无操作
    this.afterActivity();
    document.onmousedown = this.afterActivity.bind(this);
    document.onscroll = this.afterActivity.bind(this);
    document.onkeypress = this.afterActivity.bind(this);
    document.onmousemove = this.afterActivity.bind(this);
  }

  afterActivity() {
    this.maskElementHide();
    clearTimeout(this.activityTimer);
    this.activityTimer = null;
    this.activityTimer = setTimeout(() => {
      this.triggerEvent('activity');
    }, this.ACTIVITY_TIME * 1000);
  }

  maskElementShow() {
    clearTimeout(this.eventMaskTimer);
    this.eventMaskTimer = null;
    this.eventMaskTimer = setTimeout(() => {
      this.eventMaskElement.show();
    }, this.EVENT_MASK_TIME * 1000);
  }

  maskElementHide() {
    this.eventMaskElement.hide();
    this.maskElementShow();
  }

  _doing() {
    Api.courseTaskEvent.pushEvent({
      params: {
        courseId: this.courseId,
        taskId: this.taskId,
        eventName: 'doing',
      },
      data: {
        client: 'pc',
        sign: this.sign,
        startTime: this.record.endTime,
        duration: 60,
      },
    }).then(res => {
      this.record = res.record;
      if (!res.learnControl.allowLearn && res.learnControl.denyReason === 'exist_new_learning') {
        this.triggerEvent('exist_new_learning');
      }
      this._clearInterval();
      this._initInterval();
    }).catch(error => {
      this._clearInterval();
      cd.message({ type: 'danger', message: Translator.trans('task_show.user_login_protect_tip') });
    });
  }
}