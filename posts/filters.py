from posts.models import Post

def GetPosts(request):
    filters_list={
    "char":"attributes__char_value",
    "charcontains":"attributes__char_value__contains",
    "charicontains":"attributes__char_value__icontains",
    "charin":"attributes__char_value__in",
    "int":"attributes__int_value",
    "intin":"attributes__int_value__in",
    "maxint":"attributes__int_value__lte",
    "minint":"attributes__int_value__gte",
    "date":"attributes__date_value",
    "maxdate":"attributes__date_value__lte",
    "mindate":"attributes__date_value__gte",
    }
    filters={}

    # print(request.GET.urlencode())
    get=dict(request.GET)
    if request.GET.get('cat'):
        posts_list=Post.objects.filter(category__slug=request.GET.get('cat')).order_by('updated')
    else:
         posts_list=Post.objects.all().order_by('updated')


    #example request ?1_char=xl
    for key in get:
        try:
            if request.GET.get(key)!="":
                requested_data=key.split('_')
                filters[filters_list[requested_data[1]]]=request.GET.get(key).split(',') if filters_list[requested_data[1]].endswith('in') else request.GET.get(key)
                filters['attributes__attribute__id']=int(requested_data[0])
                print('***************************** filters *******')
                print(filters)
                posts_list=posts_list.filter(**filters)
                print(posts_list)
                filters={}
        except Exception as e :
            print(e)
        # filters[]=get[key]
        # filters[]

    return posts_list
