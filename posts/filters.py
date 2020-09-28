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
        posts_list=Post.objects.filter(category__id=request.GET.get('cat')).order_by('updated')
    else:
         posts_list=Post.objects.all().order_by('updated')
    for key in get:
        try:
            requested_data=key.split('_')
            filters[filters_list[requested_data[1]]]=request.GET.get(key).split(',') if filters_list[requested_data[1]].endswith('__in') else request.GET.get(key)
            filters['attributes__id']=requested_data[0]
            print(filters)
            posts_list=posts_list.filter(**filters)
            filters={}
        except Exception as e :
            print(e)
        # filters[]=get[key]
        # filters[]

    return posts_list
