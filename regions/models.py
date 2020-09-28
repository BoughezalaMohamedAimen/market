from django.db import models


class Pays(models.Model):
    name=models.CharField(max_length=255)

    def __str__(self):
        return self.name

    @property
    def wilayas(self):
        wilayas=Wilaya.objects.filter(pays=self)
        wilayas_list=[]
        for wilaya in wilayas:
            wilayas_list.append({"id":wilaya.id,"name":wilaya.name,'prix':wilaya.prix,"communes":wilaya.get_communes()})
        return wilayas_list



class Wilaya(models.Model):
    name=models.CharField(max_length=255)
    pays=models.ForeignKey(Pays,on_delete=models.CASCADE)
    prix=models.PositiveIntegerField(default=400)
    def __str__(self):
        return self.name

    def get_communes(self):
        communes=Commune.objects.filter(wilaya=self)
        communes_list=[]
        for commune in communes:
            communes_list.append({'id':commune.id,'name':commune.name})

        return communes_list


class Commune(models.Model):
    name=models.CharField(max_length=255)
    wilaya=models.ForeignKey(Wilaya,on_delete=models.CASCADE)


    def __str__(self):
        return self.name

# content = [{'id':1,'name':'Généraliste'},{'id':2,'name':'Diabetologue'}]
