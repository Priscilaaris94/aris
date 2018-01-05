$(document).ready(function(){
    $('#search').on('click', function(event){
        event.preventDefault();
        let 
        t = $('#searchterm').val(),
        n = $('#numrecords').val() || 10,
        st = $('#startyearr').val() ? ($('#startyear').val() + '0101' ) : '';
        en = $('#endyear').val() ? ($('#endyear').val() + '1231' ) : '';
        
        $.ajax({
            url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            data: {
                'api-key': 'c4a034c62bc24e8f8ed10e7cef290a6f',
                // 'end_date': st,
                // 'begin_date': en,
                'q': t
            }
        }).then(function(data){
            console.log(data);
            $('.news-cards').empty();
            for(let i = 0; i < n; i++){
                let v = data.response.docs[i];
                showNYT(i+1, v.headline.main, v.byline.original, v.web_url, true);
            }
        });
    });
    $('#clear').click(clearInputs);
    
    function showNYT(num, title, auth, link, shouldAppend){
        let frag = `
        <div class="card">
            <a href="${link}" target="_blank">
                <div class="card-body">
                <h4><span class="badge badge-secondary">${num}</span>${title}</h4>
                <p>${auth}</p>
                </div>
            </a>
        </div>`
        if(shouldAppend){
            $('.news-cards').append(frag);
        }
        return frag;
    }
    function clearInputs(){
        $('input').val('');
    }
});