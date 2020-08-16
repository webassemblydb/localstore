export async function mountQuestions({
    questionsHtmlString,
    selector
}) {
    document.getElementById(selector).innerHTML = html
    new Vue({
        el: selector,
        data: function () {
            return {
                
                visible: false
            }
        }
    })
    return true
}