const layout = require('../layout')

module.exports = ({req}) => {
    return  layout({
        content:  `<div>
    Your id is: ${req.session.userid}
    <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passConfirm" placeholder="password" />
        <button>Signup</button>
    </form>
</div>`})
}