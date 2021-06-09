import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "Elements/Button";
import { Status } from "Models/Status";
import Modal from "Elements/Modal";
import TextField from "Elements/TextField";
import { saveSettings, addNewQuestion, confirmAddQuestion, cancelAddQuestion } from "./actions";

const settingStyles = require('../settings.css');
const styles = require('./questionnaire.css');

@reduxForm({
  form: 'addNewQuestionForm',
})

class AddNewQuestionForm extends React.Component<any, any> {

  onSubmit(values: object) {
    this.props.addNewQuestion(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={styles.question}>
          <TextField label="Your question" name="question" tabIndex={2}/>
        </div>
        <div className={styles.questionsWrapper}>
          <div className={styles.answer}>
            <div>Answer 1</div>
            <div className="vertical-center">
              <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
            </div>
          </div>
          <div className={styles.answer}>
            <div>Answer 2</div>
            <div className="vertical-center">
              <span className={styles.edit}>Mark as correct</span>&nbsp;&nbsp;&nbsp;
              <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
            </div>
          </div>
          <div className={styles.answer}>
            <div>Answer 3</div>
            <div className="vertical-center">
              <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
            </div>
          </div>
          <div onClick={addNewQuestion} className={styles.addMoreAnswer}>
            <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Add new answer</span>
          </div>
        </div>
      </form>
    );
  }
}

class QuestionnaireForm extends React.Component<any, any> {

  onClick(values: object) {
    const { saveSettings } = this.props;
    saveSettings(values);
  }

  render() {
    const {
      status = new Status(),
      addStatus = new Status(),
      addNewQuestion,
      confirmAddQuestion,
      cancelAddQuestion,
    } = this.props;
    return (
      <div>
        <div className={settingStyles.titleWrapper}>
          <h4 className={settingStyles.title}>Manager Questionnaire Setup</h4>
          <p className={styles.description}>
            Here you define what are the questionnaire the Manager has to answer in order to apply.</p>
          <p className={styles.description}>Please add new question to start configuring the questionnaire.</p>
          <div className={settingStyles.questions}>
            <div className={settingStyles.questionFlex}>
              <div>
                <i className={"fa fa-bars " + styles.barsIcon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                Lorem ipsum dolor sit amet?
              </div>
              <div className="vertical-center">
                <span className={styles.edit}>Edit</span>&nbsp;&nbsp;&nbsp;
                <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
              </div>
            </div>
            <div className={settingStyles.questionFlex}>
              <div>
                <i className={"fa fa-bars " + styles.barsIcon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                Here goes another question?
              </div>
              <div className="vertical-center">
                <span className={styles.edit}>Edit</span>&nbsp;&nbsp;&nbsp;
                <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
              </div>
            </div>
            <div className={settingStyles.questionFlex}>
              <div>
                <i className={"fa fa-bars " + styles.barsIcon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                Add another one
              </div>
              <div className="vertical-center">
                <span className={styles.edit}>Edit</span>&nbsp;&nbsp;&nbsp;
                <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
              </div>
            </div>
            <div className={settingStyles.questionFlex}>
              <div>
                <i className={"fa fa-bars " + styles.barsIcon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                One more
              </div>
              <div className="vertical-center">
                <span className={styles.edit}>Edit</span>&nbsp;&nbsp;&nbsp;
                <i className={"fa fa-times-thin " + styles.icon} aria-hidden="true"></i>
              </div>
            </div>
            <div onClick={addNewQuestion} className={settingStyles.addMoreAnswer}>
              <i className={"fa fa-plus " + styles.barsIcon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>Add new question</span>
            </div>
          </div>
        </div>
        <div className={settingStyles.btnFlex}>
          <div className={settingStyles.btn}>
            <Button
              onClick={addNewQuestion}
              className="large white" loading={addStatus.loading}>
              New Question
            </Button>
          </div>
          <div className={settingStyles.btn}>
            <Button
              onClick={this.onClick.bind(this)}
              className="large blue " loading={status.loading}>
              SAVE SETTINGS
            </Button>
          </div>
        </div>
        <Modal
          isOpen={addStatus.progressing}
          title="New Question"
          confirmButtonText="ADD QUESTION"
          cancelButtonText='Cancel'
          onConfirm={confirmAddQuestion}
          onCancel={cancelAddQuestion}
          buttonStyle={{width: 'auto'}}
          buttonLoading={addStatus.loading}
        >
          <AddNewQuestionForm></AddNewQuestionForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.questionnaire.status,
  addStatus: state.questionnaire.add.status,
});

const mapDispatchToProps = {
  saveSettings,
  addNewQuestion,
  confirmAddQuestion,
  cancelAddQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireForm);
